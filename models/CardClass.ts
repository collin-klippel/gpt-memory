interface CardClassArgs {
  backgroundColor: string;
  matchProperty?: string;
}

export default class CardClass {
  static idIterator = 0;

  /**
   * Used for `react` keys.
   */
  id: number;
  /**
   * Whether or not the card is "face up" visually.
   */
  isFaceUp: boolean;
  /**
   * Whether or not the card has already been "matched," meaning it has been
   * removed from play.
   */
  isMatched: boolean;
  /**
   * Background color of the card, used as `matchProperty` by default.
   */
  backgroundColor: string;
  /**
   * The object property whose comparison determines whether or not two card
   * objects "match," meaning they should be removed from the game if all
   * matches are face up.
   */
  matchProperty: string;

  constructor(args: CardClassArgs) {
    this.id = CardClass.idIterator++;
    this.isFaceUp = false;
    this.isMatched = false;
    this.backgroundColor = args.backgroundColor;
    this.matchProperty = args.matchProperty || args.backgroundColor;
  }
}
