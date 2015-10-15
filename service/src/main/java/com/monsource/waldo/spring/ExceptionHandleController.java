package com.monsource.waldo.spring;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Created by nasanjargal on 5/31/15.
 */
@Controller
public class ExceptionHandleController {
    @ExceptionHandler(Exception.class)
    public void handleExceptions(Exception anExc) {
        anExc.printStackTrace(); // do something better than this ;)
    }
}
