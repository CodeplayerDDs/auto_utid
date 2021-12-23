// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import type { Position } from "vscode";

import * as vscode from "vscode";

import * as path from "path";

const rootName = "root";

export function activate(context: vscode.ExtensionContext) {
  console.log('"auto-test" is now active!');

  const myDisposable = vscode.commands.registerCommand(
    "auto-test.create utid",
    () => {
      const {
        activeTextEditor, //当前编辑页
      } = vscode.window;

      activeTextEditor?.edit(async (editBuilder) => {
        const fileNamePrefix = getFileNamePrefix(
          activeTextEditor.document.fileName
        );

        //获取光标位置
        const position = new vscode.Position(
          activeTextEditor.selection.active.line,
          activeTextEditor.selection.active.character
        );

        //在光标位置插入字符串
        editBuilder.insert(
          position,
          ` utid="${fileNamePrefix}-${new Date().getTime()}"`
        );
      });
    }
  );

  context.subscriptions.push(myDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

function getFileNamePrefix(p: string): string {
  const format = path.parse(p);

  return `${format.dir.split(path.sep).pop() || rootName}-${format.name}`;
}
