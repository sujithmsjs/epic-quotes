package tech.suji.quotes;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JOptionPane;

public class SwingApp extends JFrame implements ActionListener {

    private JButton button;

    public SwingApp() {
        super("Swing Application");

        button = new JButton("Click me");
        button.addActionListener(this);

        getContentPane().add(button);

        setSize(300, 200);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == button) {
            JOptionPane.showMessageDialog(this, "Hello, World!");
        }
    }

    public static void main(String[] args) {
        new SwingApp();
    }
}