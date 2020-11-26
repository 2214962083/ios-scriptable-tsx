declare class UITable {
  constructor()

  showSeparators: boolean

  addRow(row: UITableRow): void

  removeRow(row: UITableRow): void

  removeAllRows(): void

  reload(): void

  present(fullscreen: boolean): Promise<void>
}
