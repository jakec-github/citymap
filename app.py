#!/usr/bin/env python3

from flask import (Flask,
                   url_for,
                   render_template,
                   request,
                   jsonify,
                   session)

app = Flask(__name__)


@app.route("/")
def map():

    return render_template("map.html")


if __name__ == "__main__":
    app.secret_key = "super_secret_key"  # Temporary key
    app.debug = True
    app.run(host="0.0.0.0", port=5000)
