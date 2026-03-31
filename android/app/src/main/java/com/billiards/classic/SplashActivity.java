package com.billiards.classic;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        ImageView ball8 = findViewById(R.id.ball8);

        // Load roll in animation
        Animation rollIn = AnimationUtils.loadAnimation(this, R.anim.roll_in);
        
        rollIn.setAnimationListener(new Animation.AnimationListener() {
            @Override
            public void onAnimationStart(Animation animation) {}

            @Override
            public void onAnimationEnd(Animation animation) {
                // Trigger shockwave after rolling stops
                Animation shockwave = AnimationUtils.loadAnimation(SplashActivity.this, R.anim.shockwave);
                ball8.startAnimation(shockwave);
            }

            @Override
            public void onAnimationRepeat(Animation animation) {}
        });

        ball8.startAnimation(rollIn);

        // Transition to Main Menu after 3.5 seconds
        new Handler(Looper.getMainLooper()).postDelayed(() -> {
            startActivity(new Intent(SplashActivity.this, MainMenuActivity.class));
            finish();
        }, 3500);
    }
}
