export interface ControllerItem {
  serverName: string;
  noOfCpus: string;
  memory: string;
  storage: string;
  ipAddress: string;
  networkSpeed: string;
  location: string;
  label?: string;
}

export interface ControllerServerItem extends ControllerItem {
  id: string;
}
