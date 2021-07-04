export interface Resource {
    id: string;
    name: string;
    x: number;
    y: number;
    licencePlate: string;
    range: number;
    batteryLevel: number;
    helmets: number;
    model: string;
    resourceImageId: string;
    realTimeData: boolean;
    resourceType: string;
    companyZoneId: number
}