// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod events;
use events::greet;
use specta::collect_types;
use tauri::{utils::config::AppUrl, window::WindowBuilder, Manager, WindowUrl};
use tauri_specta::ts;
fn main() {
    #[cfg(debug_assertions)]
    ts::export(collect_types![greet], "../src/bindings.ts").unwrap();
    let mut context = tauri::generate_context!();

    let port = 1420;
    let host = "localhost";
    let window_url = WindowUrl::External(format!("http://{}:{}", host, port).parse().unwrap());
    // rewrite the config so the IPC is enabled on this URL
    context.config_mut().build.dist_dir = AppUrl::Url(window_url.clone());
    context.config_mut().build.dev_path = AppUrl::Url(window_url.clone());

    tauri::Builder::default()
        .plugin(tauri_plugin_localhost::Builder::new(port).build())
        .setup(move |app| {
            // WindowBuilder::new(app, "main".to_string(), window_url)
            //     .title("Localhost Example")
            //     .build()?;
            let win = app.get_window("main").unwrap();
            win.set_title("TSXeperiment").unwrap();
            win.url().set_host(Some(host)).unwrap();
            win.url().set_port(Some(port)).unwrap();

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(context)
        .expect("error while running tauri application");
}
