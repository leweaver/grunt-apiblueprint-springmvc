package my.package.controller;

import my.package.model.*;
import my.package.service.Test2ApiService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by apiblueprint-springmvc
 * 
 * This is an automatically generated file from apiblueprint:
 *   test/fixtures/test2.apib
 *
 * DO NOT MODIFY THIS FILE DIRECTLY.
 **/
@RestController
public class Test2Controller {

    private Test2ApiService test2ApiService;

    @Autowired
    public Test2Controller(Test2ApiService test2ApiService) {
        this.test2ApiService = test2ApiService;
    }
	
	/**
     * 
     **/
    @RequestMapping(value = "/posts", method = RequestMethod.GET)
    public List<Test2BlogPost> retrieveAllPosts() {
    	return test2ApiService.retrieveAllPosts();
    }

}