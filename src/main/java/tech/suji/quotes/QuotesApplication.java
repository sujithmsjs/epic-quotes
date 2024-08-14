package tech.suji.quotes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;


@SpringBootApplication
@EnableScheduling
public class QuotesApplication {

    public static void main(final String[] args) {
        SpringApplication.run(QuotesApplication.class, args);
    }
    
    //@Scheduled(fixedRate=1000)
    public void work() {
    	System.out.println("Hey, I am scheduled... :)");
    }


}
