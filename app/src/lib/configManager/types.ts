export interface Hosting {
  port: number;
  host: string;
  serviceName: string;
}

export interface Insights {
  instrumentationKey: string;
  cloudRole: string;
}

export interface Configuration {
  hosting: Hosting;
  insights: Insights;
}
