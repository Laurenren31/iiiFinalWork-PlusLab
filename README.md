# iiiFinalWork-PlusLab

![image](https://github.com/Laurenren31/iiiFinalWork-PlusLab/blob/main/plusLabHeadPic.png)
* 在資策會上課時的團體期末作業，此 git 內的檔案均為我負責的部分，網頁的其他部分及完整介紹可參考 demoPDF
* 製作的是新手導向的台股教學網站，新手可在此網站實現模擬下單 / 觀看即時新聞 / 購買教學課程 / 收藏個股等
* 開發使用 Figma 做前期規劃、VS CODE 撰寫 HTML / SCSS / React.js / Node.js

使用套件
--
* chart.js

網站架構
--
|  網頁   | 詳細內容  |
|  ----  | ----  |
| Homepage | 首頁；幾種物件互動動畫效果嘗試 / 手刻下拉清單 / 圖片無限跑馬燈 |
| News | 新聞頁總覽；觸底後會繼續載入更多新聞 / 可記錄當前閱讀位置 |
| NewsNews1 | 單一新聞頁面；字體大小修改 / 右側其他新聞推播更新 |
| Dashboard | 下單委託模擬頁；串接台灣證交所 API 取得股價即時資訊，並利用 chart.js 圖表化 / 複合收藏、搜尋、排列查詢 |
| Collection | 個人收藏頁；切換不同種類收藏列表 / 個人資料更新 |
* 頁面均依是否登入而略有不同，登入狀態將儲存於 local storage

網頁DEMO
--
https://pluslab.netlify.app/
* 由於目前部分資料庫及後端已經關閉，及免費 API 請求次數限制，DEMO 版本已將部分資料取代為 JSON 格式
* 此網站未製作響應式版本，最佳閱覽解析度為1920*1080
