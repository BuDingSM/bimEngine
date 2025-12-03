import './index.css';
import { BimDialog } from '../index';

/**
 * BimInfoDialog (二次封装示例)
 * 这是一个展示项目信息的业务弹窗组件，内部封装了 BimDialog。
 */
export class BimInfoDialog {
    private dialog: BimDialog;

    /**
     * 构造函数
     * @param container 父容器
     */
    constructor(container: HTMLElement) {
        // 创建自定义的 DOM 内容
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

        // 初始化 BimDialog，直接传入构建好的 HTMLElement
        this.dialog = new BimDialog({
            container: container,
            title: 'Project Info (Wrapped)',
            content: contentEl, 
            width: 320,
            height: 'auto',
            position: 'center',
            resizable: true,
            draggable: true
        });
    }

    /**
     * 关闭弹窗
     */
    public close() {
        this.dialog.close();
    }
}