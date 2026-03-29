package com.billiards.classic;

import android.content.Intent;
import android.os.Bundle;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.ImageView;
import androidx.appcompat.app.AppCompatActivity;

public class MainMenuActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_menu);

        // Setup floating background balls
        setupFloatingAnimation(R.id.ball1);
        setupFloatingAnimation(R.id.ball2);
        setupFloatingAnimation(R.id.ball3);

        // Setup pulse animation for Start Button
        Button btnStart = findViewById(R.id.btnStart);
        Animation pulse = AnimationUtils.loadAnimation(this, R.anim.pulse);
        btnStart.startAnimation(pulse);

        btnStart.setOnClickListener(v -> {
            Intent intent = new Intent(MainMenuActivity.this, GameActivity.class);
            startActivity(intent);
        });
    }

    private void setupFloatingAnimation(int viewId) {
        ImageView ball = findViewById(viewId);
        Animation floating = AnimationUtils.loadAnimation(this, R.anim.floating);
        ball.startAnimation(floating);
    }
}
