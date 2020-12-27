type TDependencyMap = { [key: string]: string };
type TDependencyName = string;

export interface IPackageJson {
  name: string;
  dependencies?: TDependencyMap;
  devDependencies?: TDependencyMap;
  peerDependencies?: TDependencyMap;
}

export interface IModule {
  name: string;
  dependencies: TDependencyName[]; // an aggregated list of deps
  path: string;
  directory: string;
}
