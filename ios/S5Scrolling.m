//
//  S5Scrolling.m
//  S5Trippin
//
//  Created by Yohan Kim on 4/27/16.
//  Copyright © 2016 Facebook. All rights reserved.
//


#import <UIKit/UIKit.h>
#import <CoreGraphics/CoreGraphics.h>

#import "S5Scrolling.h"
#import "RCTUIManager.h"
#import "RCTScrollView.h"

@interface S5Scrolling () {
  NSMapTable *_pinnedViews;
  NSMapTable *_distances;
}

@end

@implementation S5Scrolling

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

- (instancetype)init
{
  if (self = [super init]) {
    _pinnedViews = [[NSMapTable alloc] initWithKeyOptions:NSMapTableWeakMemory valueOptions:NSMapTableWeakMemory capacity:20];
    _distances = [[NSMapTable alloc] initWithKeyOptions:NSMapTableWeakMemory valueOptions:NSMapTableStrongMemory capacity:20];
  }
  return self;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(pin:(nonnull NSNumber *)scrollViewReactTag
                  toView:(nonnull NSNumber *)pinnedViewReactTag
                  withDistance:(nonnull NSNumber *)distance)
{
  UIView *pinnedView = [self.bridge.uiManager viewForReactTag:pinnedViewReactTag];
  UIView *scrollView = [self.bridge.uiManager viewForReactTag:scrollViewReactTag];
  if ([scrollView isKindOfClass:[RCTScrollView class]]) {
    RCTScrollView *reactScrollView = (RCTScrollView *)scrollView;
    [_pinnedViews setObject:pinnedView forKey:reactScrollView.scrollView];
    [_distances setObject:distance forKey:reactScrollView.scrollView];
    [reactScrollView setNativeScrollDelegate:self];
    [self scrollViewDidScroll:reactScrollView.scrollView];
  }
}

RCT_EXPORT_METHOD(unpin:(nonnull NSNumber *)scrollViewReactTag)
{
  UIView *scrollView = [self.bridge.uiManager viewForReactTag:scrollViewReactTag];
  if ([scrollView isKindOfClass:[RCTScrollView class]]) {
    RCTScrollView *reactScrollView = (RCTScrollView *)scrollView;
    [_pinnedViews removeObjectForKey:reactScrollView.scrollView];
    [_distances removeObjectForKey:reactScrollView.scrollView];
    [reactScrollView setNativeScrollDelegate:nil];
  }
}

- (void)scrollViewDidScroll:(UIScrollView *)scrollView
{
  UIView *pinnedView = [_pinnedViews objectForKey:scrollView];
  if (!pinnedView) {
    return;
  }
  
  CGFloat distance = [[_distances objectForKey:scrollView] doubleValue];
  CGFloat y = MAX(0, distance - scrollView.contentOffset.y);
  pinnedView.transform = CGAffineTransformMakeTranslation(0, y);
}

@end
