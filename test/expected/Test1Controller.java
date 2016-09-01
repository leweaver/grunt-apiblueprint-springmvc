package my.package.controller;

import my.package.model.*;
import my.package.service.Test1ApiService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by apiblueprint-springmvc
 * 
 * This is an automatically generated file from apiblueprint:
 *   test/fixtures/test1.apib
 *
 * DO NOT MODIFY THIS FILE DIRECTLY.
 **/
@RestController
public class Test1Controller {

    private Test1ApiService test1ApiService;

    @Autowired
    public Test1Controller(Test1ApiService test1ApiService) {
        this.test1ApiService = test1ApiService;
    }
	
	/**
     * 
     **/
    @RequestMapping(value = "/posts", method = RequestMethod.GET)
    public List<Test1BlogPost> retrieveAllPosts() {
    	return test1ApiService.retrieveAllPosts();
    }

}