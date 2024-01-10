package com.twicetrendy.TwiceTrendy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories("com.twicetrendy.TwiceTrendy")
@EntityScan("com.twicetrendy.TwiceTrendy.data")
@SpringBootApplication
public class TwiceTrendyApplication {

	public static void main(String[] args) {
		SpringApplication.run(TwiceTrendyApplication.class, args);
	}

}
