from flask import jsonify
from .services.silver_service import SilverService

def register_routes(app):
    @app.route('/api/silver-price', methods=['GET'])
    def get_silver_price():
        """
        Get current live silver spot price
        ---
        tags:
          - Silver Data
        responses:
          200:
            description: Live spot price in USD/oz and domestic converted price
        """
        try:
            weekly = SilverService.get_weekly_price()
            live = SilverService.get_live_data()
            return jsonify({
                "status": "success",
                "data": weekly,
                "live": live
            })
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    @app.route('/api/silver-history', methods=['GET'])
    def get_silver_history():
        """
        Get historical silver price records from local Dataset
        ---
        tags:
          - Silver Data
        responses:
          200:
            description: Historical list of global vs domestic prices
        """
        try:
            data = SilverService.get_historical_data()
            if data is None:
                return jsonify({"status": "error", "message": "CSV data not found"}), 404
            return jsonify({"status": "success", "data": data})
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500
