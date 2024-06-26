package cc.iteachyou.cms.controller.admin;

import cc.iteachyou.cms.common.ExceptionEnum;
import cc.iteachyou.cms.common.SearchEntity;
import cc.iteachyou.cms.entity.*;
import cc.iteachyou.cms.entity.System;
import cc.iteachyou.cms.exception.TemplateNotFoundException;
import cc.iteachyou.cms.exception.TemplateReadException;
import cc.iteachyou.cms.service.ArchivesService;
import cc.iteachyou.cms.service.CategoryService;
import cc.iteachyou.cms.taglib.utils.URLUtils;
import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageInfo;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/news")
public class NewsController {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private ArchivesService archivesService;

    @RequestMapping("list")
    @CrossOrigin(origins = "http://localhost/")
    public PageInfo<Map<String, Object>> getList() {
        SearchEntity params = new SearchEntity();
        Map model = new HashMap<String, String>() {
            {
                put("cid", "dg9j833e");
            }
        };
        params.setEntity(model);
        Category category = categoryService.queryCategoryByCode("dg9j833e");

        params.getEntity().put("sortBy", "create_time");
        params.getEntity().put("sortWay", "desc");
        return archivesService.queryListByPage(params);
    }

    @RequestMapping("listDetail")
    @CrossOrigin(origins = "http://localhost/")
    public Map<String,Object> getListDetail(String id) {
        Map<String,Object> params = new HashMap<String,Object>();
        params.put("tableName", "system_article");
        params.put("id", id);
        Map<String,Object> article = archivesService.queryArticleById(params);

        return article;
    }



}
