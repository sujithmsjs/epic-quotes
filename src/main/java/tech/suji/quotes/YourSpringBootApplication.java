package tech.suji.quotes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class YourSpringBootApplication {

    private static ConfigurableApplicationContext context;

    public static void main(String[] args) {
        context = SpringApplication.run(YourSpringBootApplication.class, args);
    }

    public static void startServer() {
        context = SpringApplication.run(YourSpringBootApplication.class);
    }

    public static void stopServer() {
        context.close();
    }
}