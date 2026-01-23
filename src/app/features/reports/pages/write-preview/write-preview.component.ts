import { Component } from '@angular/core';
import * as marked from 'marked';


@Component({
  selector: 'app-write-preview',
  templateUrl: './write-preview.component.html',
  styleUrls: ['./write-preview.component.scss']
})
export class WritePreviewComponent {

  activeTab: 'write' | 'preview' = 'write';
  commentText = '';

  switchTab(tab: 'write' | 'preview'): void {
    this.activeTab = tab;
  }

  // 🔥 Prevent browser open
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  // 🔥 Handle image drop
  onDrop(event: DragEvent): void {
    event.preventDefault();

    const file = event.dataTransfer?.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const imageUrl = URL.createObjectURL(file);

    // Markdown image syntax
    const markdownImage = `\n![${file.name}](${imageUrl})\n`;

    this.commentText += markdownImage;
  }

  get previewHtml(): string {
    return marked.parse(this.commentText || '', { async: false }) as string;
  }

}
