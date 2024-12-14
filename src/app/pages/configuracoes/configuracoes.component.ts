import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
  ],
})
export class ConfiguracoesComponent {
  @ViewChild('theme') selectTheme!: ElementRef;

  toggleImgs: boolean = false;
  togglePhrases: boolean = true;

  themes: Array<Themes> = [
    { value: 'auto', viewValue: 'Auto' },
    { value: 'light', viewValue: 'Light' },
    { value: 'dark', viewValue: 'Dark' },
    { value: 'fulldark', viewValue: 'Full Dark' }
  ];

  selectedTheme = this.themes[1].value;
  date: string = '**/**/****';

  constructor(
    private storageService: StorageService,
    private themeService: ThemeService
  ) {}

  ngAfterViewInit() {
    this.loadTheme();
    this.loadToggles();
    this.loadLastChange();
  }

  private loadTheme():void {
    const savedTheme = this.themeService.getTheme();
    if (savedTheme !== null) this.themes.forEach((item, index) => item.value === savedTheme ? this.selectedTheme = this.themes[index].value : '');
  }

  private loadToggles():void {
    const savedImg: boolean | null = this.storageService.getItem('toggleImg');
    const savedPhrases: boolean | null = this.storageService.getItem('togglePhrases');

    if (savedImg !== null) this.toggleImgs = savedImg;
    if (savedPhrases !== null) this.togglePhrases = savedPhrases;
  }

  private loadLastChange(): void {
    const savedLastChange = this.storageService.getItem('lastChange');
    if (savedLastChange) this.date = savedLastChange.toString();
  }

  public setToggleImgs(): void {
    this.storageService.setItem('toggleImg', this.toggleImgs);
  }

  public setTogglePhrases(): void {
    this.storageService.setItem('togglePhrases', this.togglePhrases);
  }

  public callSetTheme(): void {
    this.themeService.setTheme(this.selectTheme.nativeElement.value);
  }

  public async share() {
    try {
      await navigator.share({
        url: 'https://onrange.com.br/',
      });
    } catch (err) {
      this.copyLink();
    }
  }

  public copyLink(): void {
    navigator.clipboard.writeText('https://onrange.com.br/');
  }
}

interface Themes {
  value: string,
  viewValue: string
}
