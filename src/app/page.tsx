import { MainDashboard } from '@/components/main-dashboard';
import { dataService } from '@/lib/api/data-service';
import { Suspense } from 'react';

// Loading component
function DashboardLoading() {
  return (
    <div className="w-full space-y-6">
      {/* Header Stats Loading */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-muted/50 border rounded-lg p-4 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-20"></div>
                <div className="h-6 bg-muted rounded w-12"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Loading */}
      <div className="space-y-6">
        <div className="h-12 bg-muted rounded-xl animate-pulse"></div>
        <div className="h-96 bg-muted rounded-xl animate-pulse"></div>
      </div>
    </div>
  );
}

// Error component
function DashboardError({ error }: { error: Error }) {
  return (
    <div className="w-full space-y-6">
      <div className="text-center py-12">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-muted-foreground mb-4">
          We're having trouble loading the latest data. Please try again later.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Retry
        </button>
        <p className="text-xs text-muted-foreground mt-4">
          Error: {error.message}
        </p>
      </div>
    </div>
  );
}

// Main dashboard component with data fetching
async function DashboardWithData() {
  try {
    const { liveGames, leagueStandings, leagueLeaders, newsArticles } = await dataService.getAllData();

    return (
      <MainDashboard
        liveGames={liveGames}
        leagueStandings={leagueStandings}
        leagueLeaders={leagueLeaders}
        newsArticles={newsArticles}
      />
    );
  } catch (error) {
    console.error('Failed to load dashboard data:', error);
    throw error;
  }
}

export default function HomePage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardWithData />
    </Suspense>
  );
}
