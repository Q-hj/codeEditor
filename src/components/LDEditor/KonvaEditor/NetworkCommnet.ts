import Konva from 'Konva';

export class NetworkCommnet extends Konva.Group {
  constructor(networkIndex: number) {
    super();
    this.add(
      new Konva.Text({
        text: `Network ${networkIndex + 1}`,
      }),
    );
  }
}
