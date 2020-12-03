import { Card } from './Card';
import { Board } from "./Board";

export class Stage {
  public Id?: string;
  public Name = "";
  public Board?: Board;
  public Cards: Card[] = [];
}
