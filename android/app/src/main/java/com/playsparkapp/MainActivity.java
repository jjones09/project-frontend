package com.playsparkapp;

import android.content.Intent;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
        return "playsparkapp";
    }

    @Override
    public void onActivityResult (int reqCode, int resCode, Intent data) {
        super.onActivityResult(reqCode, resCode, data);
        MainApplication.getCallbackManager().onActivityResult(reqCode, resCode, data);
    }
}