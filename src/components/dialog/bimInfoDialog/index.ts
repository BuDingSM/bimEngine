import './index.css';
import { BimDialog } from '../index';

/**
 * BimInfoDialog (继承版)
 * 这是一个展示项目信息的业务弹窗组件，直接继承自 BimDialog。
 */
export class BimInfoDialog extends BimDialog {
    /**
     * 构造函数
     * @param container 父容器
     */
    constructor(container: HTMLElement) {
        // 1. 准备内容 DOM
        const contentEl = document.createElement('div');
        contentEl.className = 'bim-info-dialog-content';

        const infoTitle = document.createElement('h3');
        infoTitle.textContent = 'Model Information';

        const infoList = document.createElement('ul');
        infoList.innerHTML = `
            <li><strong>Name:</strong> Sample Project</li>
            <li><strong>Version:</strong> 1.0.0</li>
            <li><strong>Date:</strong> ${new Date().toLocaleDateString()}</li>
            <li><strong>Status:</strong> <span style="color: green;">Active</span></li>
        `;

        const actionBtn = document.createElement('button');
        actionBtn.textContent = 'Update Status';
        actionBtn.style.marginTop = '10px';
        actionBtn.onclick = () => {
            alert('Status updated!');
        };

        contentEl.appendChild(infoTitle);
        contentEl.appendChild(infoList);
        contentEl.appendChild(actionBtn);

        // 2. 调用父类构造函数，传入特定的配置
        super({
            container: container,
            title: 'dialog.testTitle',
            content: contentEl,
            width: 320,
            height: 'auto',
            position: 'center',
            resizable: true,
            draggable: true,
            // 可以在这里添加特定的 onClose 逻辑
            onClose: () => {
                console.log('Info dialog closed');
            },
            onOpen: () => {
                console.log('Info dialog opened');
            }
        });

        // 3. 如果有特定于子类的初始化逻辑，可以在 super() 之后执行
        // 例如：this.element.classList.add('my-special-class');
    }

    // 不需要再手动实现 setTheme, destroy, close, init
    // 它们都已从 BimDialog 继承
}