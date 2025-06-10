
export default interface Metrics {
  totalEvents: number;
  climateInitiatives: number;
  spongesCollected: number;
  livesImpacteds: number;
  kgRecycled: number;
  partners: Partners[]
};

export interface Partners{
  name: string;
  logo: string;
}