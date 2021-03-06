import {Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

declare const monaco;
declare const require;
declare const amdRequire;


@Component({
    selector: 'app-monaco',
    templateUrl: './monaco.component.html',
    styleUrls: ['./monaco.component.css']
})
export class MonacoComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('editor') editorContent: ElementRef; // 编辑器Element

    textData = `## Markdown content data`;

    loadData = new Subject<string>();
    markData = new Subject<string>();

    leftWidth = 600;

    private editor: any; // 创建的编辑器
    private _javascriptExtraLibs: any = null; // 释放使用过的库，可能没用
    private _typescriptExtraLibs: any = null; // 释放使用过的库
    private LineHighlight = {line: 0, decoration: []};     // 高亮行
    private breakpointMap: { [key: string]: string } = {}; // 保存所有断点
    constructor() {
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        setInterval(() => {
            // this.leftWidth = this.leftWidth;
        }, 100);
        amdRequire.config({'vs/nls': {availableLanguages: {'*': 'zh-cn'}}}); // 设置中文菜单等
        amdRequire(['vs/editor/editor.main'], () => {
            this.editor = monaco.editor.create(this.editorContent.nativeElement, {
                value: `# hello \n function hello() {\n\talert('Hello world!');\n}`,
                language: 'markdown',
                // theme: 'vs-dark'
                // automaticLayout: true,
                // scrollBeyondLastLine: false,
                // scrollbar: {
                //   verticalScrollbarSize: 12,
                //   horizontalScrollbarSize: 12
                // },
                // glyphMargin: true,
                // lineNumbersMinChars: 3,
                // minimap: {
                //   enabled: false
                // },
                // readOnly: false
            });

            this.editor.onDidChangeModelContent((e) => {
                console.log('#___________ev:', e);
                this.markData.next(this.editor.getValue());
            });
            this.textData = this.editor.getValue();
            // this.initMonaco();
        });

        this.loadData.debounceTime(200).subscribe((data) => {
            this.editor.setValue(data);
            // if (!/^error:/.test(data)) {
            //     this.check(data);
            // }
        });
        this.markData.debounceTime(200).subscribe((data) => {
            console.log('#___________data:', this.textData)
            this.textData = data;
            // if (!/^error:/.test(data)) {
            //     this.check(data);
            // }
        });
    }

    ngOnDestroy() {
        this.editor.dispose();
        if (this._javascriptExtraLibs !== null) {
            this._javascriptExtraLibs.dispose();
        }

        if (this._typescriptExtraLibs !== null) {
            this._typescriptExtraLibs.dispose();
        }
    }

    /** 初始化脚本编辑器 */
    initMonaco() {
        // this.programScriptService.editorExist = true;

        // this.luaSnippet();

        this.addMenuAction();

        // if (this.options.customPreventCarriageReturn === true) {
        //     let preventCarriageReturn = this.editor.addCommand(monaco.KeyCode.Enter, function () {
        //         return false;
        //     });
        // }

        this.editor.onMouseDown((e) => {
            // this.breakpointHandler(e);
        });

        // this.programScriptService.loadProgramScript.subscribe((data) => {
        //   this.editor.setValue(data);
        //   if (!/^error:/.test(data)) {
        //     this.check(data);
        //   }
        // });

        // this.programScriptService.focus.delay(300).subscribe(() => {
        //   if (this.editor) {
        //     this.editor.focus();
        //   }
        // });
        //
        // this.programScriptService.currentProgramTreeToScript();

        this.editor.focus();

        // this.luaLpegService.reported().subscribe(data => {
        //   if (data.action === "lua.print") {
        //     const buf = data.data.split(" ");
        //     if (buf.length === 6) {
        //       if (buf[0] === "Paused") {
        //         const line: number = parseInt(buf[buf.length - 1], 10);
        //         this.setLineHighlight(line);
        //       }
        //     }
        //   }
        // });
        //
        // this.programScriptService.setLineHighLight.subscribe((data) => {
        //   if (data) {
        //     this.setLineHighlight(data);
        //   } else {
        //     this.setLineHighlight(-1);
        //   }
        // });
        //
        // this.simulationService.simulationStateChange.subscribe(value => {
        //   this.editor.updateOptions({
        //     readOnly: value
        //   });
        // });
    }

    /** 添加到右键菜单功能 */
    addMenuAction() {
        // this.editor.addAction(
        //   {
        //     id: 'code-format',
        //     label: '代码格式化',
        //     keybindingContext: null,
        //     contextMenuGroupId: 'navigation',
        //     contextMenuOrder: 1.5,
        //     run: () => {
        //       this.editor.setValue(this.luaLpegService.luaPretty(this.editor.getValue()));
        //       return null;
        //     }
        //   });
        // 不支持先不添加
        // this.editor.addAction({
        //     id: 'code-convert',
        //     label: '转化成树',
        //     keybindingContext: null,
        //     contextMenuGroupId: 'navigation',
        //     contextMenuOrder: 1.5,
        //     run: () => {
        //         this.luaLpegService.parse(this.editor.getValue()).subscribe((data) => {
        //             let res: any;
        //             if (data.name && data.name === 'Error') {
        //                 res = '转化失败：' + data.message;
        //                 this.windowService.info(res);
        //             } else {
        //                 res = data;
        //                 this.windowService.info(res);
        //             }
        //         });
        //         return null;
        //     }
        // });
    }

    /** 代码提示功能 */
    // luaSnippet() {
    //   monaco.languages.registerCompletionItemProvider('lua', {
    //     provideCompletionItems: () => { // 代码有用，是个错误警告
    //       return snippets; // 导入的提示规则
    //     }
    //   });
    // }

    mythemme() {
        monaco.editor.defineTheme('myCoolTheme', {
            // base: 'vs-dark',
            inherit: true,
            rules: [
                {background: '4c4b51'},
                {token: 'custom-info', foreground: '808080'},
                {token: 'custom-error', foreground: 'ff0000', fontStyle: 'bold'},
                {token: 'custom-notice', foreground: 'FFA500'},
                {token: 'custom-date', foreground: '008800'},
            ],
            colors: {
                'editor.background': '#4c4b51',
                'editorLineNumber.foreground': '#c2c2c2',
            }
        });
    }

    /**
     * 程序树和3D分割线处鼠标点击
     * @param {MouseEvent} e 鼠标按下事件
     */
    leftMouseDown(e: MouseEvent) {
        // const new_leftPanelWidth = parseInt(this.leftPanelWidth.split("px")[0], 10);
        const preX = e.pageX;
        document.onmousemove = (ev) => {
            console.log('#___________move ev:', this.leftWidth, ev);
            const NextX = ev.pageX;
            const moveX = NextX - preX;
            // if (new_leftPanelWidth + moveX + 8 >= this.windowService.winWidth) {
            //     this.leftPanelWidth = this.windowService.winWidth - 8 + 'px';
            //     this.windowService.terminalWidth = 8 + 'px';
            // } else if (new_leftPanelWidth + moveX <= 8) {
            //     this.leftPanelWidth = 8 + 'px';
            //     this.windowService.terminalWidth = this.windowService.winWidth - 8 + 'px';
            // } else {
            //     this.leftPanelWidth = (new_leftPanelWidth + moveX) + 'px';
            //     this.windowService.terminalWidth = this.elementRef.nativeElement
            //         .parentElement.offsetWidth - (new_leftPanelWidth + moveX) + 'px';
            // }
            // this.windowService.leftWidth = parseInt(this.leftPanelWidth.split("px")[0], 10);

            // setTimeout(() => {
                this.leftWidth = ev.x;
                if (this.editor) {
                    this.editor.layout();
                }
            // }, 0);
        };
        document.onmouseup = () => {
            document.onmousemove = null;
        }
    }
}
