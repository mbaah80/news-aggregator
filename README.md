# News Aggregator

A modern news aggregator application built with React, TypeScript, Tailwind CSS, and Ant Design. This application fetches news from multiple sources and provides a customizable news feed with search and filtering capabilities.

## Features

- Fetch news from multiple sources (NewsAPI, The Guardian, New York Times)
- Search and filter news by keyword, date, category, and source
- Save favorite articles
- Customize news feed preferences
- Mobile-responsive design
- Dark mode support

## Tech Stack

- React.js with TypeScript
- Tailwind CSS for styling
- Ant Design component library
- Zustand for state management
- Axios for API requests
- React Router for navigation
- Docker for containerization

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)

## API Keys

This application requires API keys from the following services:

1. [NewsAPI](https://newsapi.org/)
2. [The Guardian API](https://open-platform.theguardian.com/)
3. [New York Times API](https://developer.nytimes.com/)

## Setup and Installation

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/news-aggregator.git
   cd news-aggregator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your API keys:
   ```
   VITE_NEWS_API_KEY=your_newsapi_key
   VITE_GUARDIAN_API_KEY=your_guardian_api_key
   VITE_NYT_API_KEY=your_nyt_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Docker Deployment

1. Create a `.env` file with your API keys (as shown above)

2. Build and run the Docker container:
   ```bash
   docker-compose up -d
   ```

3. Access the application at `http://localhost:8080`

## Usage

### Home Page

The home page displays the latest news articles from your selected sources. You can:
- Search for specific news using the search bar
- Filter news by category, date range, and source
- Save articles to your favorites

### Favorites Page

The favorites page shows all the articles you've saved. You can:
- Remove articles from your favorites
- Click on an article to read the full content

### Settings Page

The settings page allows you to customize your news feed. You can:
- Select your preferred news sources
- Choose preferred categories
- Add preferred authors
- Toggle dark mode

## Project Structure

```
news-aggregator/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   ├── services/       # API and other services
│   ├── store/          # Zustand store
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
├── public/             # Static assets
├── .env               # Environment variables
├── docker-compose.yml # Docker compose configuration
├── Dockerfile         # Docker build instructions
├── nginx.conf         # Nginx configuration
└── package.json       # Project dependencies
```

## Docker Configuration

### Docker Files
- `Dockerfile`: Multi-stage build process for production
- `docker-compose.yml`: Container orchestration
- `nginx.conf`: Nginx server configuration for serving the app

### Environment Variables
Create a `.env` file in the project root:
```env
VITE_NEWS_API_KEY=your_news_api_key
VITE_GUARDIAN_API_KEY=your_guardian_api_key
VITE_NYT_API_KEY=your_nyt_api_key
```

### Docker Commands
```bash
# Build and start the application
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop the application
docker-compose down

# View logs
docker-compose logs -f

# Rebuild without cache
docker-compose build --no-cache
```

### Accessing the Application
Once running, access the application at:
- http://localhost:8080

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
