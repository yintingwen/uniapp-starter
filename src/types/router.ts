export class Router {
  navigateTo(path: string, params: Record<string, any>, options: NavigateToOptions): void;
  navigateTo(options: NavigateToOptions): void;

  redirectTo(path: string, params: Record<string, any>, options: RedirectToOptions): void;
  redirectTo(options: RedirectToOptions): void;

  reLaunch(path: string, params: Record<string, any>, options: ReLaunchOptions): void;
  reLaunch(options: ReLaunchOptions): void;

  navigateBack(delta: number, option: UniNamespace.NavigateBackOptions): void;
  navigateBack(option: UniNamespace.NavigateBackOptions): void;;

  switchTab(path: string, options: UniNamespace.SwitchTabOptions): void;
  switchTab(options: UniNamespace.SwitchTabOptions): void;

  getFullPath(path: string, params: Record<string, any>): string;
}

interface NavigateToOptions extends UniNamespace.NavigateToOptions {
  params?: Record<string, any>
}

interface RedirectToOptions extends UniNamespace.RedirectToOptions {
  params?: Record<string, any>
}

interface ReLaunchOptions extends UniNamespace.ReLaunchOptions {
  params?: Record<string, any>
}