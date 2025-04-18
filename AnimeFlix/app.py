from flask import Flask, render_template
from flask_cors import CORS
import redis
import json
import pandas as pd
import json
from flask import jsonify

app = Flask(__name__)
CORS(app)
host = "redis-11535.c339.eu-west-3-1.ec2.redns.redis-cloud.com"
port = 11535
password = "Ipssi_Lille"

# Connexion à Redis Cloud
r = redis.Redis(
    host=host,
    port=port,
    password=password,
    decode_responses=True
)

# Fonction pour convertir Redis → DataFrame
def get_dataframe():
    keys = r.keys("anime:*")
    animes = [json.loads(r.get(k)) for k in keys]
    df = pd.DataFrame([{
        "id": a["mal_id"],
        "titre": a.get("title"),
        "score": a.get("score"),
        "scored_by": a.get("scored_by"),
        "type": a.get("type"),
        "episodes": a.get("episodes"),
        "année": a.get("year"),
        "genres": ", ".join(g['name'] for g in a.get("genres", [])) if a.get("genres") else None
    } for a in animes])
    return df


@app.route("/stats/top")
def top_animes():
    df = get_dataframe()
    df_top10 = df[df["score"].notnull()].sort_values("score", ascending=False).head(10)
    top_animes = df_top10.to_dict(orient="records")
    # return render_template("top.html", animes=top_animes)
    return jsonify(top_animes)
@app.route("/stats/genres")
def top_genres():
    df = get_dataframe()

    from collections import Counter
    genre_counter = Counter()
    for genres in df["genres"].dropna():
        for genre in genres.split(", "):
            genre_counter[genre] += 1

    top = sorted(genre_counter.items(), key=lambda x: x[1], reverse=True)[:10]
    # return render_template("genres.html", genres=top)
    return jsonify(top)
@app.route("/stats/decennies")
def stats_decennies():
    df = get_dataframe()
    df_dec = df[df["année"].notnull()].copy()
    df_dec["décennie"] = (df_dec["année"] // 10) * 10

    df_decade_stats = df_dec.groupby("décennie").agg(
        nb_animes=("id", "count"),
        score_moyen=("score", "mean")
    ).sort_index()

    # Conversion en dict pour Jinja
    stats = df_decade_stats.reset_index().to_dict(orient="records")
    # return render_template("decennies.html", stats=stats)
    return jsonify(stats)
@app.route("/stats/moinsapprecie")
def top_moins_apprecies():
    df = get_dataframe()
    df_worst = df[df["score"].notnull()].sort_values("score", ascending=True).head(10)
    worst = df_worst.to_dict(orient="records")
    return jsonify(worst)
@app.route("/stats/combogenres")
def combo_genres():
    from collections import Counter
    from itertools import combinations

    animes = [json.loads(r.get(k)) for k in r.keys("anime:*")]
    combo_counter = Counter()

    for a in animes:
        genres = [g['name'] for g in a.get("genres", [])]
        for combo in combinations(sorted(genres), 2):
            combo_counter[combo] += 1

    combos = sorted(combo_counter.items(), key=lambda x: x[1], reverse=True)[:10]
    combo_data = [{"combo": " + ".join(c), "count": n} for c, n in combos]

    # return render_template("combogenres.html", combos=combo_data)
    return jsonify(combo_data)
@app.route("/stats/topgenre")
def top_by_top_genres():
    from collections import Counter, defaultdict

    animes = [json.loads(r.get(k)) for k in r.keys("anime:*")]

    # Compter les genres
    genre_counter = Counter()
    for a in animes:
        for g in a.get("genres", []):
            genre_counter[g['name']] += 1

    top_genres = [g[0] for g in genre_counter.most_common(10)]

    # Grouper les animes par genre
    genre_map = defaultdict(list)
    for a in animes:
        for g in a.get("genres", []):
            name = g['name']
            if name in top_genres and a.get("score"):
                genre_map[name].append(a)

    # Trier chaque genre par score
    genre_top = {}
    for genre, anime_list in genre_map.items():
        sorted_anime = sorted(anime_list, key=lambda x: x["score"], reverse=True)[:5]
        genre_top[genre] = sorted_anime

    # return render_template("topgenre.html", genre_top=genre_top)
    return jsonify(genre_top)
@app.route("/stats/topgenrescore")
def top_genres_score():
    from collections import Counter

    animes = [json.loads(r.get(k)) for k in r.keys("anime:*")]

    # Obtenir le top 10 des genres
    genre_counter = Counter()
    for a in animes:
        for g in a.get("genres", []):
            genre_counter[g['name']] += 1

    top_genres = [g[0] for g in genre_counter.most_common(10)]

    # Filtrer les animes avec score > 8 et contenant un genre du top 10
    filtered = []
    for a in animes:
        if not a.get("score") or a["score"] <= 8 or not a.get("genres"):
            continue
        anime_genres = [g["name"] for g in a["genres"]]
        if any(g in top_genres for g in anime_genres):
            filtered.append(a)

    filtered = sorted(filtered, key=lambda x: x["score"], reverse=True)[:15]

    # return render_template("topgenrescore.html", animes=filtered)
    return jsonify(filtered)


@app.route("/stats/studios")
def top_studios():
    from collections import Counter
    animes = [json.loads(r.get(k)) for k in r.keys("anime:*")]

    studio_counter = Counter()
    for a in animes:
        for s in a.get("studios", []):
            studio_counter[s["name"]] += 1

    top_studios = studio_counter.most_common(5)
    # return render_template("studios.html", studios=top_studios)
    return jsonify(top_studios)
@app.route("/stats/types")
def top_types():
    df = get_dataframe()
    top_types = df["type"].value_counts().head(5).reset_index()
    top_types.columns = ["type", "count"]
    # return render_template("types.html", types=top_types.to_dict(orient="records"))
    return jsonify(top_types.to_dict(orient="records"))

@app.route("/stats/typescore")
def score_by_type():
    df = get_dataframe()
    df_type_score = df.groupby("type").agg(score_moyen=("score", "mean")).sort_values("score_moyen", ascending=False)
    records = df_type_score.reset_index().to_dict(orient="records")
    # return render_template("typescore.html", typescore=records)
    return jsonify(records)
@app.route("/stats/populaires")
def animes_populaires():
    animes = [json.loads(r.get(k)) for k in r.keys("anime:*")]

    animes_with_pop = [
        a for a in animes if a.get("popularity") is not None
    ]

    top = sorted(animes_with_pop, key=lambda x: x["popularity"])[:20]
    # return render_template("populaires.html", animes=top)
    return jsonify(top)
@app.route("/stats/chart-popularite")
def chart_popularite():
    animes = [json.loads(r.get(k)) for k in r.keys("anime:*")]
    filtered = [a for a in animes if a.get("score") and a.get("popularity")]

    # Top 10 selon popularité
    top = sorted(filtered, key=lambda x: x["popularity"])[:10]

    # Data pour le chart
    data = [{
        "title": a["title"],
        "score": a["score"],
        "popularity": a["popularity"]
    } for a in top]

    # return render_template("chart_popularite.html", data=json.dumps(data))
    return jsonify(data)
@app.route("/stats/plus_notes")
def plus_notes():
    animes = [json.loads(r.get(k)) for k in r.keys("anime:*")]

    # Animes avec un champ scored_by valide
    rated = [a for a in animes if a.get("scored_by") and a.get("score")]

    # Top 20 par nombre de votes
    top_voted = sorted(rated, key=lambda x: x["scored_by"], reverse=True)[:20]

    # Top 10 des animes très notés mais mal notés
    top_worst = sorted(
        [a for a in rated if a["scored_by"] > 100_000],  # seuil d'intérêt
        key=lambda x: x["score"]
    )[:10]
    return jsonify({"top": top_voted, "worst": top_worst})


    # return render_template("plus_notes.html", top=top_voted, worst=top_worst)
    
@app.route("/stats/chart-score-votes")
def chart_score_votes():
    df = get_dataframe()
    df_valid = df[df["score"].notnull() & df["scored_by"].notnull()]
    df_top = df_valid.sort_values(by="scored_by", ascending=False).head(50)

    chart_data = df_top[["titre", "score", "scored_by"]].to_dict(orient="records")
    # return render_template("chart_score_votes.html", data=json.dumps(chart_data))
    return jsonify(chart_data)
@app.route("/stats/tableau")
def tableau_animes():
    df = get_dataframe()
    df = df[df["score"].notnull()].sort_values("score", ascending=False)
    animes = df.head(200).to_dict(orient="records")  # ou plus
    # return render_template("tableau.html", animes=animes)
    return jsonify(animes)

@app.route("/")
def accueil():
    pages = [
        {"titre": "📋 Tableau interactif (DataTable)", "url": "/stats/tableau"},
        {"titre": "🏆 Top 10 animes par score", "url": "/stats/top"},
        {"titre": "📚 Top genres les plus fréquents", "url": "/stats/genres"},
        {"titre": "📅 Statistiques par décennie", "url": "/stats/decennies"},
        {"titre": "👎 Anime le moins apprécié", "url": "/stats/moinsapprecie"},
        {"titre": "🎭 Combos de genres fréquents", "url": "/stats/combogenres"},
        {"titre": "🔥 Top animes par genre populaire", "url": "/stats/topgenre"},
        {"titre": "💎 Score > 8 dans genres populaires", "url": "/stats/topgenrescore"},
        {"titre": "🏢 Top 5 studios", "url": "/stats/studios"},
        {"titre": "📺 Top types d’animes", "url": "/stats/types"},
        {"titre": "👀 Animes les plus regardés (popularité)", "url": "/stats/populaires"},
        {"titre": "📢 Animes les plus notés (et les plus détestés)", "url": "/stats/plus_notes"},
        {"titre": "📊 Score moyen par type", "url": "/stats/typescore"},
        {"titre": "📊 Graphique Score vs Popularité", "url": "/stats/chart-popularite"},
        {"titre": "📈 Graphique Score vs Nombre de votes", "url": "/stats/chart-score-votes"},


    ]
    return render_template("index.html", pages=pages)

if __name__ == "__main__":
    app.run(debug=True)