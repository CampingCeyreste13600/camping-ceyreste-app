
window.CEYRESTE_REPORTS={submit:async(payload,file)=>{
 const cfg=window.CEYRESTE_SUPABASE||{}, has=Boolean(cfg.url&&cfg.anonKey&&window.supabase);
 if(!has){const rows=JSON.parse(localStorage.getItem("ceyreste_reports")||"[]");payload.id="LOCAL-"+Date.now();if(file)payload.photo_name=file.name;rows.unshift(payload);localStorage.setItem("ceyreste_reports",JSON.stringify(rows));return payload;}
 const client=window.supabase.createClient(cfg.url,cfg.anonKey);let photo_url="";
 if(file){const path=`reports/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g,"_")}`,up=await client.storage.from(cfg.bucket||"signalements").upload(path,file,{contentType:file.type});if(up.error)throw up.error;photo_url=client.storage.from(cfg.bucket||"signalements").getPublicUrl(path).data.publicUrl;}
 const res=await client.from("signalements").insert({...payload,photo_url}).select().single();if(res.error)throw res.error;return res.data;
}};
