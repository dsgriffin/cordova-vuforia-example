/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

//
//  AppDelegate.m
//  VuforiaPlugin
//
//  Created by ___FULLUSERNAME___ on ___DATE___.
//  Copyright ___ORGANIZATIONNAME___ ___YEAR___. All rights reserved.
//

#import "AppDelegate.h"
#import "MainViewController.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    CGRect screenBounds = [[UIScreen mainScreen] bounds];
#if __has_feature(objc_arc)
self.window = [[UIWindow alloc] initWithFrame:screenBounds];
#else
self.window = [[[UIWindow alloc] initWithFrame:screenBounds] autorelease];
#endif
self.window.autoresizesSubviews = YES;
#if __has_feature(objc_arc)
self.viewController = [[MainViewController alloc] init];
#else
self.viewController = [[[MainViewController alloc] init] autorelease];
#endif
UINavigationController * nc = [[UINavigationController alloc]initWithRootViewController:self.viewController];
[nc setNavigationBarHidden:YES animated:NO];
self.window.rootViewController = nc;
[self.window makeKeyAndVisible];
return YES;

}

@end
