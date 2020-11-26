declare class UITableRow {
  constructor()

  cellSpacing: number

  height: number

  isHeader: boolean

  dismissOnSelect: boolean

  backgroundColor: Color

  onSelect(selected: number): void

  addCell(cell: UITableCell): void

  addText(title: string, subtitle: string): UITableCell

  addImage(image: Image): UITableCell

  addImageAtURL(url: string): UITableCell

  addButton(title: string): UITableCell
}
