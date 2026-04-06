export type IconName = `${string}_${string}`;

export interface AssetModel {
  name: string;
  type: string;
  icon: IconName;
}
