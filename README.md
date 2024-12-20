# Weather App

Weather App is a user-friendly application for searching cities and retrieving their current weather and forecasts for up to 10 days. Additionally, upon accessing the site, users can allow location permissions to receive weather information for their current location and view the corresponding time zone.

---

## Features
- Search for cities to get current weather and a 10-day forecast.
- Automatically fetches weather and time zone data based on your location (with user permission).
- Clean and intuitive user interface.

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js**: v14 or higher
- **npm** or **yarn**

### Steps to Run Locally
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd weather-app
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables**:
   - Create a `.env` file in the project root by copying the `.env.example` file:
     ```bash
     cp .env.example .env
     ```
   - Add your Weather API key:
     ```env
     NEXT_PUBLIC_API_BASE_URL=https://api.weatherapi.com/v1/
     NEXT_PUBLIC_API_KEY=your-api-key
     ```
     > **Note**: You need to request an API key from [WeatherAPI](https://www.weatherapi.com/) to use this app.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

---

## Available Commands

- **`dev`**: Starts the development server with Turbopack for fast builds.
  ```bash
  npm run dev
  ```
- **`build`**: Builds the app for production.
  ```bash
  npm run build
  ```
- **`start`**: Runs the app in production mode after building.
  ```bash
  npm run start
  ```
- **`lint`**: Lints the codebase for errors and formatting issues.
  ```bash
  npm run lint
  ```
- **`test`**: Runs the tests using Jest in watch mode.
  ```bash
  npm run test
  ```

---

## Usage

### Search for Weather
1. Use the search bar to enter a city name.
2. View current weather and the 10-day forecast for the city.

### Allow Location Access
When you enter the app, you'll be prompted to allow location access. Granting access enables the app to:
- Fetch weather information for your current location.
- Display the local time zone.

---

## Environment Variables

The app uses the following environment variables:

| Variable Name              | Description                                       |
|----------------------------|---------------------------------------------------|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for the Weather API                      |
| `NEXT_PUBLIC_API_KEY`      | Your API key obtained from WeatherAPI             |

---

## Troubleshooting

### Common Issues
1. **Missing API Key**: Ensure you have set the `NEXT_PUBLIC_API_KEY` in your `.env` file.
2. **Location Not Detected**: Verify that your browser allows location services for the app.

---