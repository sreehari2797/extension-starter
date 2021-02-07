import { AppBridgeService } from "../service/app-bridge.service";
import {NovoElementProviders, NovoElementsModule} from 'novo-elements';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Util } from '../../util/util';

@Component({
    selector:    'headshot-card',
    templateUrl: './index.html',
    providers:  [ NovoModalService ]
})

export class HeadshotCardComponent implements OnInit {
    public url: string;
    private readonly entityId: number;

    constructor(
        private novoModalService: NovoModalService,
        private appBridgeService: AppBridgeService,
        private location: Location
        
    ) {
        this.entityId = this.getBullhornId('EntityID');
    }

    ngOnInit():void {
        const url =  this.location.path(true);
        const candidateId = url.search.split('EntityId=')[1];

        this.appBridgeService.promise().then (appbridge => {
            appbridge.httpGET('/query/CandidateFileAttachment?where=candidate.id=${candidateId} AND type='Photo'').then(response =>
                {
                    const file = response.data.data[0];

                    if (file)
                    {
                        this.url = "data:${contentType}/${contentSubType};base64,${data}";
                    }
                    else {
                        this.url="";
                    }

                    
                })
        })
    }

    private getBullhornId(param: string): number {
        return parseInt(this.route.snapshot.queryParamMap.get(param), 10);
    }
}