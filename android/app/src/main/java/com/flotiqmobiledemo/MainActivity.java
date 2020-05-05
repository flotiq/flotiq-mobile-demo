package com.flotiqmobiledemo;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

  @Override
  public void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this, R.style.SplashStatusBarTheme);
      super.onCreate(savedInstanceState);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "FlotiqMobileDemo";
  }
}
