import { Optional } from "@angular/core";

export interface LineOfBusiness {
  id: number;
  name: string;
  description: string;
  quoted: Optional;
}
