import { getTrackDetail, songUrl } from "../api/track";
import { isLoggedIn } from "./auth";
import { Howl, Howler } from "howler";
import store from "../store/index";
export default class {
    constructor() {
        //播放器状态
        this._playing = false; // 是否播放
        this._progress = 0; // 播放歌曲进度
        this._volume = 1; // 音量 0-1
       
        //播放信息
        this._list = [] // 播放列表
        this._current = 0; // 当前播放歌曲在列表的索引
        this._currentTrack = {}; //当前播放歌曲的详细信息
        this._currentTrackDuration = 1000; //当前播放歌曲的时长
        
        // howler 音频库
        this._howler = null

        this._init()
        
    } 
    
    get playing() {
        return this._playing
    }
    
    set playing(value) {
        this._playing = value
    }

    get progress() {
        console.log(this._progress,'get');
        return this._progress
    }

    set progress(value) {
        this._howler?.seek(value)
        this._progress = value
        console.log('setProgress')
    }

    get volume() {
        console.log(this._volume,'get');
        return this._volume
    }

    set volume(value) {
        this._volume = value
        this._howler?.volume(value)
    }
    
    get list() {
        return this._list
    }

    set list(value) {
        this._list = value
    }
    
    get current() {
        return this._current
    }

    set current(value) {
        this._current = value
    }

    get currentTrack() {
        return this._currentTrack
    }

    set currentTrack(value) {
        this._currentTrack = value
    }

    get currentTrackDuration() {
        return this._currentTrack.dt || 1000
    }

    _init() {
        this._loadFromLocalStorage();
        this._howler?.volume(this.volume);
        
        this._setProgerss();
    }
    _setProgerss() {
        setInterval(() => {
            if(this._howler === null) return ;
            // this._progress = this._howler.seek();
            store.commit('updatePlayerProgress', this._howler.seek())
            console.log('计时器');
        },1000)
    }
    // 从localStorage加载Player
    _loadFromLocalStorage() {
       const player = JSON.parse(localStorage.getItem('player'))
       if(!player) return ;
       for(const [key,value] of Object.entries(player)) {
        this[key] = value
       } 
    }
    /**
     * @description 添加歌曲到播放队列
     * @param {number} trackId 歌曲id
     * @param {boolean} playNow 立刻播放 | 下一首
     */
    addTrackToList(trackId, playNow) {
        if(playNow) {
            if(this.list.length === 0) {
                this.list.push(trackId);
                this.current = 0;
                this._replaceCurrentTrack(trackId)
            } else {
                //去重
                if(this.list.includes(trackId)) {
                    //被删除的索引
                    const index = this.list.findIndex(item => {
                        return item === trackId
                    })
                    console.debug(index,this.current)
                    //列表索引变化，current对应改变
                    if(this.current > index) {
                        this.current = this.current - 1;
                    }
                    this.list.splice(index,1)
                    console.debug(this.list)
                }
                this.list.splice(this.current + 1,0,trackId);
                console.debug(this.list)
                this.current = this.current + 1;
                this._replaceCurrentTrack(trackId);
            }
        } else {
            this.list.push(trackId);
        }
    }
    /**
     * @description 替换当前播放器播放歌曲 player.current currentTrack
     */
    _replaceCurrentTrack(id) {
       return getTrackDetail(id)
                .then(res => {
                    const track = res.songs[0]
                    this._currentTrack = track
                    this._replaceCurrentTrackAudio(track)
                }) 
    } 
    /**
     * @description 替换当前播放器播放歌曲的音频资源
     */
    _replaceCurrentTrackAudio(track) {
        return this._getAudioSource(track)
                 .then(source => {
                   if(source) {
                     this._playAudioSource(source)
                   }        
                 })
    }
    /**
     * @description 根据音乐详情 获取音乐音频信息
     * @param {*} track 
     */
    _getAudioSource(track) {
      if(isLoggedIn()) {
        return songUrl({id:track.id,level:'exhigh'})
                 .then(res => {
                    console.log('获取音频url...',res)
                    // 音频资源
                    const source = res.data[0].url
                    return source;
                 }) 
      }
    }
    /**
     * @description 播放器根据音频播放
     */
    _playAudioSource(source) {
       //卸载当前播放器
       Howler.unload();
       
       this._howler = new Howl({
        src: [source], // 播放源
        html5 : true, // html5 audio 流式播放 适合大文件
        format: ['mp3','flac'], // 播放器默认使用文件默认后缀，不符合时使用此类转换
        onend: () => {
            this._playNextTrack();
        }
       })
       console.log('播放器初始化完成')
       this.play()
    }

    /**
     * @description 获取下一首歌的id
     * @returns 
     */
    _getNextTrack() {
        const next = this.current + 1;

        return [this.list[next],next]
    }
     /**
     * @description 获取上一首歌的id
     * @returns 
     */
    _getPrevTrack() {
        const next = this.current - 1;
    
        return [this.list[next],next]
    }
    
    /**
     * @description 播放下一首歌
     * @returns 
     */
    _playNextTrack() {
       const [trackId, index] = this._getNextTrack()
       if(trackId === undefined) {
         console.log('停止播放')
         this._howler?.stop();
         this.playing = false
         return false
       }
       this.current = index;
       this._replaceCurrentTrack(trackId)
       return true
    }
    playNextTrack() {
        return this._playNextTrack();
    }
     /**
     * @description 播放上一首歌
     * @returns 
     */
    _playPrevTrack() {
        const [trackId, index] = this._getPrevTrack()
        if(trackId === undefined) {
          console.log('停止播放')
          this._howler?.stop();
          this.playing = false
          return false
        }
        this.current = index;
        this._replaceCurrentTrack(trackId)
        return true
     }
     playPrevTrack() {
        return this._playPrevTrack();
     }
    // 添加整个歌单到播放队列
    replacePlaylist(trackIds) {
      this.list = trackIds
      this.current = 0
      this._replaceCurrentTrack(this.list[0])
    }
        /**
     * @description 播放
     * @returns
     */
    play() {
        if(this._howler.playing()) return ;
        this._howler?.play();
        
        this._howler?.once('play', () => {
            this._howler?.fade(0, this.volume, 200);
            console.log('播放')
            this.playing = true
        })
    
    }
    /**
     * @description 暂停
     */
    pause() {
        this._howler?.fade(this.volume, 0, 200);

        this._howler?.once('fade', () => {
            this._howler?.pause()
            console.log('播放停止')
            this.playing = false
        })
    }
    
}