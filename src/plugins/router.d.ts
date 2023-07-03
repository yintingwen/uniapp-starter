interface Uni {
  $router: Router
}

class Router {
  navigateTo (path: string, params: Record<string, any>): void;
  navigateTo (options: RouterOptions): void;
  
  redirectTo (path: string, params: Record<string, any>): void;
  redirectTo (options: RouterOptions): void;

  reLaunch (path: string, params: Record<string, any>): void;
  reLaunch (options: RouterOptions): void;

  navigateBack (delta: number): void;
  
  switchTab (path: string, params: Record<string, any>): void;
  getFullPath (path: string, params: Record<string, any>): string;
}

interface RouterOptions {
  url: string
  params?: Record<string, any>
}