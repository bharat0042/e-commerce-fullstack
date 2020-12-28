package com.bharat.ecommerce.config;

import com.bharat.ecommerce.entity.Product;
import com.bharat.ecommerce.entity.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class RestDataConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public RestDataConfig(EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration configuration) {
        HttpMethod[] unsupportedMethods = {HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.POST};

        configuration.getExposureConfiguration()
                     .forDomainType(Product.class)
                     .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedMethods))
                     .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedMethods));

        configuration.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedMethods))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedMethods));



        exposeIds(configuration);
        //configuration.exposeIdsFor(ProductCategory.class, Product.class);
    }

    public void exposeIds(RepositoryRestConfiguration configuration) {

        Set<EntityType<?>> entityTypeSet = entityManager.getMetamodel().getEntities();
        List<Class> entityClassList = new ArrayList<>();

        for(EntityType tempEntityType : entityTypeSet) {
            entityClassList.add(tempEntityType.getJavaType());
        }

        Class[] domainTypes = entityClassList.toArray(new Class[0]);

        configuration.exposeIdsFor(domainTypes);
    }
}
