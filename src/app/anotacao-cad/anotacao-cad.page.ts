import { async } from '@angular/core/testing';
import { Anotacao } from './../model/anotacao';
import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { MediaCapture, MediaFile, CaptureImageOptions, CaptureVideoOptions } from '@ionic-native/media-capture/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-anotacao-cad',
  templateUrl: './anotacao-cad.page.html',
  styleUrls: ['./anotacao-cad.page.scss'],
})
export class AnotacaoCadPage implements OnInit {

  public titulo: string;
  public descricao: string;
  public cor: string;
  public atualizar: boolean = false;

  public tituloCor: string = "";
  public index: number;
  public indexAnotacao: number;
  public auxIndexAnotacao: string;
  public idCategoria: number;
  public corDominante: string;

  public categorias: any[] = [];
  public anotacao: any;
  public audios: any[] = [];
  public fotos: any = [];

  public foto: string = "";

  public audioFile: MediaObject;
  public playAudio: boolean = true;


  constructor(private activRoute: ActivatedRoute,
    private nativeStorage: NativeStorage,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private tts: TextToSpeech,
    private mediaCapture: MediaCapture,
    private camera: Camera, 
    private media: Media,
    private file: File) { }

  ngOnInit() {
    this.corDominante = this.activRoute.snapshot.paramMap.get('corDominante');
    this.idCategoria = Number(this.activRoute.snapshot.paramMap.get('id'));
    this.index = Number(this.activRoute.snapshot.paramMap.get('index'));
    this.auxIndexAnotacao = this.activRoute.snapshot.paramMap.get('indexAnotacao');
    this.cor = this.corDominante;
    this.loadingCategorias();
    this.anotacao = new Anotacao();
  }

  ionViewWillEnter() {
   
  }

  async corAnotacao(cor: string) {
    this.cor = cor;
    if (cor === 'success') {
      cor = 'verde';
    } else if (cor === 'secondary') {
      cor = 'azul claro';
    } else if (cor === 'dark') {
      cor = 'preto';
    } else if (cor === 'tertiary') {
      cor = 'terciária';
    } else if (cor === 'warning') {
      cor = 'amarelo';
    } else if (cor === 'danger') {
      cor = 'vermelho';
    } else if (cor === 'light') {
      cor = 'leve';
    } else if (cor === 'medium') {
      cor = 'médio';
    }
    const toast = await this.toastCtrl.create({
      message: 'Card ' + cor + ' selecionado',
      duration: 1200,
      position: 'top', 
      color: this.cor
    });
    toast.present();
  }

  async salvar() {
    if (this.validar() === 1) {
      if (this.indexAnotacao >= 0) {
        this.categorias[this.index].anotacao[this.indexAnotacao].titulo = this.titulo;
        this.categorias[this.index].anotacao[this.indexAnotacao].descricao = this.descricao;
      } else {
        this.add();
      }
      this.updateNativeStorage();
      this.navegar();
    } else {
      let toast = await this.toastCtrl.create({
        message: 'Cadastrar Título e descrição',
        duration: 3000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
    }
  }

  validar() {
    if (!this.titulo || !this.descricao) {
      return 0;
    } else {
      return 1;
    }
  }

  add() {
    if (this.titulo.trim().length > 0 && this.descricao.trim().length > 0) {
      this.anotacao.titulo = this.titulo;
      this.anotacao.descricao = this.descricao;
      this.anotacao.cor = this.cor;

      let dt = new Date();
      let data = dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear();
      let hora = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();

      this.anotacao.data = ' ' + data;
      this.anotacao.hora = ' ' + hora;

      this.categorias[this.index].anotacao.push(this.anotacao);
    }
  }


  updateNativeStorage() {
    this.nativeStorage.setItem('categorias', JSON.stringify(this.categorias))
      .then(() => {
      })
      .catch();
  }

  navegar() {
    this.navCtrl.navigateForward(['anotacao-list', this.corDominante, this.idCategoria, this.index]);
  }

  buscar(ev: any) {
    this.tituloCor = ev.detail.value;
  }

  async loadingCategorias() {
    this.nativeStorage.getItem('categorias')
      .then(categoriasJson => {
        if (categoriasJson != null) {
          this.categorias = JSON.parse(categoriasJson);
          this.isEditar();
        }
      })
      .catch(() => {
        alert("Erro não encontrei as categorias");
      });
  }

  async excluirAnotacao() {
    let alert = await this.alertCtrl.create({
      header: 'Confirmação',
      message: 'Excluir a anotacao: ' + this.categorias[this.index].anotacao[this.indexAnotacao].titulo + ' ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Confirmar',
          cssClass: 'secondary',
          handler: () => {
            this.categorias[this.index].anotacao.splice(this.indexAnotacao, 1);
            this.updateNativeStorage();
            this.navegar();
          }
        }
      ]
    });

    await alert.present();
  }

  async isEditar() {
    if ((this.auxIndexAnotacao) || this.auxIndexAnotacao == '0') {
      this.indexAnotacao = Number(this.auxIndexAnotacao);
      this.titulo = this.categorias[this.index].anotacao[this.indexAnotacao].titulo;
      this.descricao = this.categorias[this.index].anotacao[this.indexAnotacao].descricao;
      this.atualizar = true;
      this.audios = this.categorias[this.index].anotacao[this.indexAnotacao].audios;
      this.fotos = this.categorias[this.index].anotacao[this.indexAnotacao].fotos;
    } 
  }


  async lerAnotacao() {
    if ((this.titulo) || (this.descricao)) {
      let tituloDesc: string = "Titulo " + this.titulo + " descrição. " + this.descricao;
      this.lerAnotacaoString(tituloDesc);
    } else {
      alert('Cadastrar Título e descrição');
    }

  }

  async lerAnotacaoString(texto: string) {
    this.tts.speak({
      text: texto,
      rate: 1,
      locale: 'pt-BR'
    })
      .then()
      .catch();
  }

  async play(myFile: any) {
    if (myFile.name.indexOf('.3gpp') > -1 ||
      myFile.name.indexOf('.m4a') > -1    || 
      myFile.name.indexOf('.flac') > -1   || 
      myFile.name.indexOf('.mp3') > -1    || 
      myFile.name.indexOf('.wav') > -1){
      if (this.playAudio) {
        this.audioFile = this.media.create(myFile.localURL);
        this.audioFile.play();
        this.playAudio = false;
      } else {
        this.audioFile.pause();
        this.audioFile.stop();
        this.playAudio = true;
      }
    } 
  }

  async captureAudio() {
    this.mediaCapture.captureAudio()
      .then((res) => {
        if (res) {
          this.audios = this.audios.concat(res);

          if ((this.indexAnotacao) || this.indexAnotacao === 0) {
            this.categorias[this.index].anotacao[this.indexAnotacao].audios = this.audios;
          } else {
            this.anotacao.audios = this.anotacao.audios.concat(this.audios);
          }

        }
      })
      .catch();
  }

  async createImagem() {
    const options : CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE, 
      targetWidth:  300, 
      targetHeight: 500, 
    }

    this.camera.getPicture(options)
    .then((data) =>{
      this.foto = 'data:image/png;base64,' + data;
      this.fotos.push(this.foto);  

      if ((this.indexAnotacao) || this.indexAnotacao === 0) {
        this.categorias[this.index].anotacao[this.indexAnotacao].fotos = this.fotos;
      } else {
        this.anotacao.fotos.push(this.foto); 
      }
      
    });

  }

}
