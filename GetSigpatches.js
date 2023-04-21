import { load } from 'cheerio';
import axios from 'axios';
import fetch from "node-fetch";
import { writeFile } from "fs";


function download(u, p) {
    return fetch(u, {
        method: 'GET',
        headers: { 'Content-Type': 'application/octet-stream' },
    }).then(res => res.buffer()).then(_ => {
        writeFile(p, _, "binary", function (err) {
            console.log(err || p);
        });
    });
}

async function main() {

    try {
        var l = await axios.get('https://gbatemp.net/threads/sigpatches-for-atmosphere-hekate-fss0-fusee-package3.571543/', {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36 Edg/92.0.902.78"
        });
        //var o = html2;
        var $ = await load(l.data)
        $('.attachmentList li a').each((index, e) => {
            if (e.attribs.href!=null)
            {
                var url="https://gbatemp.net"+e.attribs.href;
                download(url, decodeURI(url.split(".").reverse()[1]).split("/").reverse()[0]+'.zip')
            }
        })
    }
    catch (error) {
        console.log(error)
    }
}

main();