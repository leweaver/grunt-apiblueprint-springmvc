package api.controller;

/**
 * Created by apiblueprint-springmvc-stubber
 * 
 * This is an automatically generated file from apiblueprint:
 *   tst/resourceGroups.apib
 *
 * generated on: Wed Aug 12 2015 23:22:40 GMT+1000 (AEST)
 *
 * DO NOT MODIFY THIS FILE DIRECTLY.
 **/
@RestController
public class CouponsController {

    private CouponsApiService couponsApiService;

    @Autowired
    public CouponsController(CouponsApiService couponsApiService) {
        this.couponsApiService = couponsApiService;
    }
	
    /**
     * Retrieves the coupon with the given ID.
     **/
    @RequestMapping(value = "/coupons/{id}", method = RequestMethod.GET)
    public CouponBase retrieveACoupon(@PathVariable("id") String id) {
    	return couponsApiService.retrieveACoupon(id);
    }
	
    /**
     * Returns a list of your coupons.
     **/
    @RequestMapping(value = "/coupons{?limit}", method = RequestMethod.GET)
    public List<Coupon> listAllCoupons(@PathVariable("limit") Integer limit) {
    	return couponsApiService.listAllCoupons(limit);
    }
	
    /**
     * Creates a new Coupon.
     **/
    @RequestMapping(value = "/coupons", method = RequestMethod.POST)
    public Coupon createACoupon(@RequestBody CouponBase couponBase) {
    	return couponsApiService.createACoupon(couponBase);
    }

}