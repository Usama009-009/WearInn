import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  visiblePanels: Set<string> = new Set();
  isMobileView: boolean = window.innerWidth < 768;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobileView = (event.target as Window).innerWidth < 768;
    if (!this.isMobileView) {
      this.hideAllPanels();
    }
  }

  showPanel(panelId: string) {
    if (this.isMobileView) {
      this.visiblePanels.has(panelId) ? this.visiblePanels.delete(panelId) : this.visiblePanels.add(panelId);
    } else {
      this.visiblePanels = new Set();
      this.visiblePanels.add(panelId);
    }
  }

  hidePanel(panelId: string) {
    this.visiblePanels.delete(panelId);
  }

  isPanelVisible(panelId: string): boolean {
    return this.visiblePanels.has(panelId);
  }

  hideAllPanels() {
    this.visiblePanels = new Set();
  }

  ngOnInit() {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize.bind(this));
  }
}
