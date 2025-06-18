# Real Data Integration Guide

## Overview

Gridiron Facts now supports real NFL data integration through multiple APIs with automatic fallback to placeholder data. This ensures the app always works, even when APIs are unavailable.

## Architecture

### Data Flow
```
User Request → Data Service → API Layer → Data Adapter → Components
                    ↓
              Placeholder Data (Fallback)
```

### Components

1. **NFL API Service** (`src/lib/api/nfl-api.ts`)
   - Handles ESPN API integration
   - Manages API requests and caching
   - Provides fallback mechanisms

2. **Data Adapter** (`src/lib/api/data-adapter.ts`)
   - Transforms API data to app format
   - Handles data normalization
   - Maps team abbreviations to full data

3. **Data Service** (`src/lib/api/data-service.ts`)
   - Orchestrates data fetching
   - Manages caching and fallbacks
   - Provides unified interface

4. **Configuration** (`src/lib/config.ts`)
   - Centralized app configuration
   - Environment variable management
   - Feature flags

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Enable real data integration
NEXT_PUBLIC_USE_REAL_DATA=true

# ESPN API Configuration
NEXT_PUBLIC_NFL_API_URL=https://site.api.espn.com/apis
NEXT_PUBLIC_NFL_API_KEY=your_api_key_here

# News API Configuration (optional)
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key_here

# Cache Settings
NEXT_PUBLIC_CACHE_DURATION=300000
NEXT_PUBLIC_FALLBACK_TO_PLACEHOLDER=true
```

### Configuration Options

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_USE_REAL_DATA` | `false` | Enable real data integration |
| `NEXT_PUBLIC_NFL_API_URL` | ESPN API | Base URL for NFL data |
| `NEXT_PUBLIC_NFL_API_KEY` | - | API key for NFL data |
| `NEXT_PUBLIC_CACHE_DURATION` | `300000` | Cache duration in milliseconds |
| `NEXT_PUBLIC_FALLBACK_TO_PLACEHOLDER` | `true` | Fallback to placeholder data |

## API Integration

### ESPN API

The app integrates with ESPN's public API for:
- Live game scores and status
- Team standings
- Player statistics
- Game schedules

**Endpoints Used:**
- `/sports/football/nfl/scoreboard` - Current games
- `/sports/football/nfl/standings` - Team standings
- `/sports/football/nfl/statistics` - Player stats

### News API

For news articles, the app can integrate with:
- NewsAPI.org
- ESPN News API
- Custom news sources

## Testing

### Test API Route

Visit `/api/test` to test API integration:

```bash
curl http://localhost:9002/api/test
```

This will return:
```json
{
  "config": {
    "useRealData": true,
    "baseUrl": "https://site.api.espn.com/apis",
    "hasApiKey": false
  },
  "tests": {
    "games": {
      "success": true,
      "apiCount": 16,
      "transformedCount": 16
    },
    "standings": {
      "success": true,
      "apiCount": 32,
      "transformedCount": 8
    }
  }
}
```

### Manual Testing

1. **Enable Real Data:**
   ```bash
   NEXT_PUBLIC_USE_REAL_DATA=true npm run dev
   ```

2. **Check Console Logs:**
   - Open browser dev tools
   - Look for API fetch logs
   - Verify data transformation

3. **Test Fallback:**
   - Disable real data
   - Verify placeholder data loads
   - Check error handling

## Error Handling

### Automatic Fallbacks

The app automatically falls back to placeholder data when:
- API requests fail
- Network errors occur
- Rate limits are hit
- Invalid data is returned

### Error Logging

All API errors are logged to console with:
- Error type and message
- API endpoint attempted
- Fallback action taken

## Caching

### Cache Strategy

- **Duration:** 5 minutes (configurable)
- **Storage:** In-memory Map
- **Keys:** `games`, `standings`, `leaders`, `news`

### Cache Management

```typescript
import { dataService } from '@/lib/api/data-service';

// Clear cache
dataService.clearCache();

// Get cache status
const status = dataService.getCacheStatus();
console.log(status); // { size: 4, keys: ['games', 'standings', 'leaders', 'news'] }
```

## Performance

### Optimization Features

1. **Parallel API Calls:** All data fetched simultaneously
2. **Intelligent Caching:** Reduces API calls
3. **Lazy Loading:** Data loaded only when needed
4. **Error Boundaries:** Graceful error handling

### Monitoring

Monitor API performance through:
- Browser Network tab
- Console logs
- `/api/test` endpoint

## Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Use server-side API routes
   - Check API endpoint configuration

2. **Rate Limiting:**
   - Implement exponential backoff
   - Increase cache duration

3. **Data Format Changes:**
   - Update DataAdapter
   - Add data validation

### Debug Mode

Enable debug logging:

```typescript
// In browser console
localStorage.setItem('debug', 'true');
```

## Future Enhancements

### Planned Features

1. **Real-time Updates:**
   - WebSocket integration
   - Server-sent events
   - Polling optimization

2. **Additional APIs:**
   - NFL Official API
   - SportsData.io
   - MySportsFeeds

3. **Advanced Caching:**
   - Redis integration
   - Persistent storage
   - Cache invalidation

4. **Data Analytics:**
   - Usage metrics
   - Performance monitoring
   - Error tracking

## Support

For issues with real data integration:

1. Check the test endpoint: `/api/test`
2. Review console logs
3. Verify environment variables
4. Test with placeholder data first 