package tech.suji.quotes;

import java.awt.GridLayout;
import java.net.InetAddress;
import java.net.UnknownHostException;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.SwingUtilities;

import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;


public class ServerControlGUI extends JFrame {

    private static ConfigurableApplicationContext context;
    private JLabel statusLabel;
    private JLabel ipAddressLabel;
    private JLabel portLabel;
    private JTextField portTextField;

    public ServerControlGUI() {
        super("Server Control");

        JButton startButton = new JButton("Start");
        JButton stopButton = new JButton("Stop");

        startButton.addActionListener(e -> startServer());
        stopButton.addActionListener(e -> stopServer());

        statusLabel = new JLabel("Server status: Down");
        ipAddressLabel = new JLabel("IP Address: ");
        portLabel = new JLabel("Port: ");
        portTextField = new JTextField(10); // Text field for entering port number

        JPanel buttonPanel = new JPanel();
        buttonPanel.add(startButton);
        buttonPanel.add(stopButton);

        JPanel statusPanel = new JPanel();
        statusPanel.setLayout(new GridLayout(4, 1));
        statusPanel.add(statusLabel);
        statusPanel.add(ipAddressLabel);
        statusPanel.add(portLabel);
        statusPanel.add(portTextField);

        getContentPane().setLayout(new GridLayout(2, 1));
        getContentPane().add(buttonPanel);
        getContentPane().add(statusPanel);

        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(300, 200);
        setLocationRelativeTo(null);
        setVisible(true);
    }

    private void startServer() {
        if (context == null) {
            // Retrieve port number from text field
            int port;
            try {
                port = Integer.parseInt(portTextField.getText());
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(this, "Invalid port number.", "Error", JOptionPane.ERROR_MESSAGE);
                return;
            }

            // Set port number for the Spring Boot server
            System.setProperty("server.port", Integer.toString(port));

            // Start the Spring Boot server
            context = SpringApplication.run(QuotesApplication.class);
            statusLabel.setText("Server status: Up");

            // Get IP address and port
            try {
                String ipAddress = InetAddress.getLocalHost().getHostAddress();
                String portStr = Integer.toString(port);
                ipAddressLabel.setText("IP Address: " + ipAddress);
                portLabel.setText("Port: " + portStr);
            } catch (UnknownHostException e) {
                e.printStackTrace();
            }

            System.out.println("Spring Boot server started on port " + port + ".");
        } else {
            System.out.println("Spring Boot server is already running.");
        }
    }

    private void stopServer() {
        if (context != null) {
            context.close();
            context = null;
            statusLabel.setText("Server status: Down");
            ipAddressLabel.setText("IP Address: ");
            portLabel.setText("Port: ");
            System.out.println("Spring Boot server stopped.");
        } else {
            System.out.println("Spring Boot server is not running.");
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(ServerControlGUI::new);
    }
}
