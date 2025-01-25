package com.sergipetec.gestaoFrota;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.awt.*;
import java.net.URI;

@SpringBootApplication
public class GestaoFrotaApplication {

	public static void main(String[] args) {
		SpringApplication.run(GestaoFrotaApplication.class, args);

		openHomePage();
	}
	private static void openHomePage() {
		try {
			String url = "http://localhost:8080";

			if (Desktop.isDesktopSupported()) {
				Desktop.getDesktop().browse(new URI(url));
			} else {
				System.out.println("Desktop não suportado, abra manualmente: " + url);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}


}
